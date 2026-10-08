const fs = require('fs');

let fileContent = fs.readFileSync('src/components/PlatformSettings.tsx', 'utf8');

// Remove Localization from navItems
fileContent = fileContent.replace(
  "    { id: 'Localization', title: 'Localization', subtitle: 'Language, timezone, units' },\n",
  ""
);

// Remove Account lockout block
const accountLockoutStart = "                    {/* Account Lockout */}";
const accountLockoutEnd = "                    </div>\n\n                  </div>"; // The closing div of account lockout and the closing div of the flex column.

const startIdx = fileContent.indexOf(accountLockoutStart);
if (startIdx !== -1) {
  const endIdx = fileContent.indexOf("</div>", fileContent.indexOf("</select>", startIdx)) + 6;
  // let's actually find the start of the next div to be safe.
  const nextDiv = "                  </div>\n\n                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'";
  const endBlockIdx = fileContent.indexOf(nextDiv, startIdx);
  if (endBlockIdx !== -1) {
      const stringToRemove = fileContent.substring(startIdx, endBlockIdx);
      fileContent = fileContent.replace(stringToRemove, "");
  }
}

// Ensure no trailing border bottom on the Idle Session Timeout block if Account Lockout is removed.
// We should remove borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' from Idle Session Timeout.
fileContent = fileContent.replace(
  "borderBottom: '1px solid #f1f5f9', paddingBottom: '24px'",
  ""
);

fs.writeFileSync('src/components/PlatformSettings.tsx', fileContent);
console.log('Done!');
