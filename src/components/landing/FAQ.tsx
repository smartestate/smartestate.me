import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is Smart Estate?", a: "Smart Estate is an AI-powered property maintenance platform that automates triage, technician assignment, and real-time tracking for property managers and maintenance companies." },
  { q: "Who is this for?", a: "Real estate companies, property managers, and maintenance service providers who want to streamline their maintenance workflows and improve tenant satisfaction." },
  { q: "How does the AI categorization work?", a: "Our AI analyzes submitted tickets — including text, photos, and videos — to automatically classify issue type, severity, and urgency, reducing manual triage time by up to 90%." },
  { q: "Is there a free trial?", a: "We're currently in early access. Join the waitlist to be among the first to try Smart Estate when we launch." },
  { q: "How does technician matching work?", a: "Our smart matching algorithm considers technician skills, current availability, proximity to the job site, and workload balance to assign the optimal technician for each job." },
  { q: "Can I integrate with existing tools?", a: "Yes — Smart Estate is designed to integrate with popular property management systems, communication tools, and payment platforms. More integrations are coming soon." },
];

export default function FAQ() {
  return (
    <section id="faq" data-cursor-ignore="true" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ opacity: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">FAQ</h2>
          <p className="text-muted-foreground text-lg">Common questions, answered.</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
