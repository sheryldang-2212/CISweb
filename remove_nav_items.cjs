const fs = require('fs');

let platformSettings = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Remove Data Privacy & Compliance
platformSettings = platformSettings.replace(
  "    { id: 'Data Privacy & Compliance', title: 'Data Privacy & Compliance', subtitle: 'Retention, masking, consent' },\n",
  ""
);

// Remove Tenant Defaults
platformSettings = platformSettings.replace(
  "    { id: 'Tenant Defaults', title: 'Tenant Defaults', subtitle: 'Plans, quotas, onboarding' },\n",
  ""
);

// Remove Integrations
platformSettings = platformSettings.replace(
  "    { id: 'Integrations', title: 'Integrations', subtitle: 'SMS, payment, HL7/FHIR' },\n",
  ""
);

fs.writeFileSync('src/components/PlatformSettings.tsx', platformSettings);
console.log('Done!');
