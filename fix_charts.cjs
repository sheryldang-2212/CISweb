const fs = require('fs');

let fileContent = fs.readFileSync('src/components/ReportsAnalytics.tsx', 'utf8');

const startMarker = "          {/* Active vs Total Patients and New vs Returning Patients */}";
const endMarker = "        </div>\n      )}";

const startIdx = fileContent.indexOf(startMarker);
if (startIdx !== -1) {
  // Find the end of my jsxBlock. It ends right before the next "        </div>\n      )}" which is from my script.
  const firstEndIdx = fileContent.indexOf(endMarker, startIdx);
  if (firstEndIdx !== -1) {
    const blockToMove = fileContent.substring(startIdx, firstEndIdx);
    
    // Remove it from current location and add the missing </div>
    fileContent = fileContent.substring(0, startIdx) + "</div>\n" + fileContent.substring(firstEndIdx);
    
    // Now fileContent has Lab Volume fixed.
    // Let's insert the block at the end of Patient Demographics.
    // The Patient Demographics block ends with the LAST occurrence of endMarker.
    const lastEndIdx = fileContent.lastIndexOf(endMarker);
    if (lastEndIdx !== -1) {
       fileContent = fileContent.substring(0, lastEndIdx) + blockToMove + endMarker + fileContent.substring(lastEndIdx + endMarker.length);
    }
  }
}

fs.writeFileSync('src/components/ReportsAnalytics.tsx', fileContent);
console.log('Fixed!');
