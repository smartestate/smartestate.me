import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import "./IPadCursor.css";

// Selectors for elements the cursor should snap/morph to
const INTERACTIVE_SELECTORS = [
    "a",
    "button",
    "[role='button']",
    "[data-cursor-snap]",
    "input",
    "textarea",
    "select",
    "label[for]",
    "summary",
    "[tabindex]",
];

const TEXT_INPUT_TAGS = new Set(["INPUT", "TEXTAREA"]);

// Spring config – fast and slightly bouncy, like iPadOS
const SPRING_CONFIG = { damping: 28, stiffness: 380, mass: 0.55 };
const SPRING_FAST = { damping: 35, stiffness: 500, mass: 0.4 };

const DEFAULT_SIZE = 20;
const SNAP_PADDING = 6; // extra padding around snapped element

/**
 * Walk up the DOM to find the nearest interactive ancestor that
 * the cursor should snap to.
 */
function findSnapTarget(el: Element | null): HTMLElement | null {
    let current = el;
    while (current && current !== document.body) {
        if (current instanceof HTMLElement) {
            for (const sel of INTERACTIVE_SELECTORS) {
                if (current.matches(sel)) {
                    return current;
                }
            }
        }
        current = current.parentElement;
    }
    return null;
}

function isTextInput(el: HTMLElement): boolean {
    if (TEXT_INPUT_TAGS.has(el.tagName)) {
        const type = (el as HTMLInputElement).type;
        // exclude non-text inputs
        return !type || ["text", "email", "password", "search", "url", "tel", "number"].includes(type);
    }
    return false;
}

export default function IPadCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    // Motion values for position
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const width = useMotionValue(DEFAULT_SIZE);
    const height = useMotionValue(DEFAULT_SIZE);
    const borderRadius = useMotionValue(DEFAULT_SIZE / 2);

    // Springs for smooth following
    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);
    const springW = useSpring(width, SPRING_FAST);
    const springH = useSpring(height, SPRING_FAST);
    const springBR = useSpring(borderRadius, SPRING_FAST);

    const [pressing, setPressing] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [textMode, setTextMode] = useState(false);
    const [snapping, setSnapping] = useState(false);

    // Track the current snap target so we can detect changes
    const snapTargetRef = useRef<HTMLElement | null>(null);
    // Store the raw mouse position for calculating offset when snapping
    const mousePos = useRef({ x: 0, y: 0 });

    // Core logic: evaluate what's under a given viewport coordinate and update cursor
    const updateCursorAt = useCallback(
        (cx: number, cy: number) => {
                const elUnder = document.elementFromPoint(cx, cy);
                // If the element (or any ancestor) declares data-cursor-ignore="true", skip snapping/morphing
                if (elUnder instanceof Element) {
                    const ignore = (elUnder as Element).closest('[data-cursor-ignore="true"]');
                    if (ignore) {
                        x.set(cx);
                        y.set(cy);
                        width.set(DEFAULT_SIZE);
                        height.set(DEFAULT_SIZE);
                        borderRadius.set(DEFAULT_SIZE / 2);

                        setSnapping(false);
                        setTextMode(false);
                        snapTargetRef.current = null;
                        return;
                    }
                }
            const target = findSnapTarget(elUnder);

            if (target) {
                const rect = target.getBoundingClientRect();
                const style = getComputedStyle(target);
                const br = parseFloat(style.borderRadius) || 8;

                const snapW = rect.width + SNAP_PADDING * 2;
                const snapH = rect.height + SNAP_PADDING * 2;

                x.set(rect.left - SNAP_PADDING + snapW / 2);
                y.set(rect.top - SNAP_PADDING + snapH / 2);
                width.set(snapW);
                height.set(snapH);
                borderRadius.set(Math.min(br + 4, snapH / 2));

                setSnapping(true);
                setTextMode(isTextInput(target));
                snapTargetRef.current = target;
            } else {
                x.set(cx);
                y.set(cy);
                width.set(DEFAULT_SIZE);
                height.set(DEFAULT_SIZE);
                borderRadius.set(DEFAULT_SIZE / 2);

                setSnapping(false);
                setTextMode(false);
                snapTargetRef.current = null;
            }
        },
        [x, y, width, height, borderRadius]
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            setHidden(false);
            updateCursorAt(e.clientX, e.clientY);
        },
        [updateCursorAt]
    );

    // Re-evaluate on scroll so the cursor doesn't stay stuck to a scrolled-away element
    const handleScroll = useCallback(() => {
        const { x: mx, y: my } = mousePos.current;
        if (mx === 0 && my === 0) return; // no mouse data yet
        updateCursorAt(mx, my);
    }, [updateCursorAt]);

    const handleMouseDown = useCallback(() => setPressing(true), []);
    const handleMouseUp = useCallback(() => setPressing(false), []);
    const handleMouseLeave = useCallback(() => setHidden(true), []);
    const handleMouseEnter = useCallback(() => setHidden(false), []);

    useEffect(() => {
        // Detect touch devices — don't attach listeners
        if (window.matchMedia("(pointer: coarse)").matches) return;

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll, { capture: true } as EventListenerOptions);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove, handleScroll, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    // Build CSS class names
    const classNames = [
        "ipad-cursor",
        hidden && "ipad-cursor--hidden",
        pressing && "ipad-cursor--pressing",
        textMode && "ipad-cursor--text",
        snapping && "ipad-cursor--snapping",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <motion.div
            ref={cursorRef}
            className={classNames}
            style={{
                x: springX,
                y: springY,
                width: springW,
                height: springH,
                borderRadius: springBR,
                translateX: "-50%",
                translateY: "-50%",
                scale: pressing ? (snapping ? 0.96 : 0.85) : 1,
            }}
            transition={{ scale: { type: "spring", damping: 20, stiffness: 400 } }}
        />
    );
}
