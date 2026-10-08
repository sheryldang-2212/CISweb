const fs = require('fs');
const file = 'src/components/PlatformDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// I will extract the blocks manually based on the current file state
// which was already reordered once! So the markers are different now.

// Wait, the file is ALREADY reordered. I just need to move "Add Clinic" and "Invite Clinic Admin" buttons from Platform Operation to Clinic Operation.
// And put them under a new "Quick Actions" row in Clinic Operation if needed, or just change the grid templates.

// Actually, the user's mockup only shows "Quick Actions" in the Platform Operation tab.
// Do they still want "Add Clinic" and "Invite Clinic Admin" somewhere?
// The mockup shows "Quick Actions" under "Platform Operation" with exactly 2 buttons: "Configure Package" and "Review Audit Logs".
// Let's just remove "Add Clinic" and "Invite Clinic Admin" from the Quick Actions row!
// Let's look at the current quick actions block string and remove the first two buttons.

const addClinicBtnStart = content.indexOf('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\'');
const pkgBtnStart = content.indexOf('<button style={{ display: \'flex\', alignItems: \'center\', justifyContent: \'space-between\', padding: \'16px\', backgroundColor: \'white\'', addClinicBtnStart + 1000); 
// There are 4 buttons, so I need to find the start of the 3rd button.

const btn1 = content.indexOf('<button style={{ display: \'flex\'');
const btn2 = content.indexOf('<button style={{ display: \'flex\'', btn1 + 1);
const btn3 = content.indexOf('<button style={{ display: \'flex\'', btn2 + 1);

// Cut from btn1 to btn3.
const preBtn1 = content.substring(0, btn1);
const fromBtn3 = content.substring(btn3);

// Also change gridTemplateColumns from repeat(4, 1fr) to repeat(2, 1fr) for Quick Actions
let newContent = preBtn1 + fromBtn3;
newContent = newContent.replace('gridTemplateColumns: \'repeat(4, 1fr)\'', 'gridTemplateColumns: \'repeat(2, 1fr)\'');

// Does the user want those buttons in Clinic Operation? 
// The mockup image didn't show Clinic Operation. But those actions are definitely Clinic operations.
// I will just put them under Clinic Operation.
// Let's extract btn1 and btn2.
const cutButtons = content.substring(btn1, btn3);

const clinicSectionMarker = '{/* CLINIC OPERATION SECTION */}';
const clinicSectionIndex = newContent.indexOf(clinicSectionMarker);
const afterClinicHeader = newContent.indexOf('</h2>', clinicSectionIndex) + 6;

const clinicQuickActions = '\n      {/* CLINIC QUICK ACTIONS */}\n' +
'      <div style={{ marginBottom: "24px" }}>\n' +
'        <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>\n' +
'          <div style={{ width: "4px", height: "16px", backgroundColor: "#3b82f6", borderRadius: "2px" }}></div>\n' +
'          Clinic Actions\n' +
'        </h2>\n' +
'        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>\n' +
cutButtons +
'        </div>\n' +
'      </div>\n';

newContent = newContent.substring(0, afterClinicHeader) + clinicQuickActions + newContent.substring(afterClinicHeader);

fs.writeFileSync(file, newContent);
console.log('Done splitting quick actions!');
