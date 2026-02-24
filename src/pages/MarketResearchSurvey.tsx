const YOUFORM_URL = 'https://app.youform.com/forms/xehdqwp1';

export default function MarketResearchSurvey(): JSX.Element {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto py-12 px-4">
        <div id="market-research-embed">
          <iframe
            src={YOUFORM_URL}
            loading="lazy"
            width="100%"
            height={700}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            style={{ border: 'none' }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            Can't see the form?{' '}
            <a href={YOUFORM_URL} target="_blank" rel="noreferrer" className="text-primary hover:underline">
              Open the survey in a new tab
            </a>
            .
          </div>
        </div>
      </div>
    </main>
  );
}
