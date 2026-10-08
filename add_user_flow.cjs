const fs = require('fs');

let fileContent = fs.readFileSync('src/components/PlatformUserManagement.tsx', 'utf8');

// 1. Add import
fileContent = fileContent.replace(
  "import { Search, MoreVertical, UserPlus, Settings, Eye, Edit, Key, PowerOff, Trash2 } from 'lucide-react';",
  "import { Search, MoreVertical, UserPlus, Settings, Eye, Edit, Key, PowerOff, Trash2 } from 'lucide-react';\nimport InviteStaffDrawer from './InviteStaffDrawer';"
);

// 2. Add state and handler
const stateReplacement = `
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Clinic Users' | 'Platform Super Admin'>('Clinic Users');
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);
  const [clinicUsers, setClinicUsers] = useState(MOCK_PLATFORM_USERS);
  const [superAdmins, setSuperAdmins] = useState(MOCK_SUPER_ADMINS);

  const handleInviteStaff = (invitedUsers: any[]) => {
    const newUsers = invitedUsers.map(u => ({
      id: \`inv-\${Date.now()}-\${Math.random()}\`,
      name: u.name || '-',
      phone: u.phone || '-',
      email: u.email,
      role: u.role,
      clinics: u.clinic || 'System Wide',
      extraClinics: null,
      status: 'Pending Invitation',
      lastLoginDate: '-',
      lastLoginTime: '-'
    }));
    
    if (activeTab === 'Clinic Users') {
      setClinicUsers([...newUsers, ...clinicUsers]);
    } else {
      setSuperAdmins([...newUsers, ...superAdmins]);
    }
    setShowInviteDrawer(false);
  };
`;
fileContent = fileContent.replace(
  "  const [searchTerm, setSearchTerm] = useState('');\n  const [openMenuId, setOpenMenuId] = useState<string | null>(null);\n  const [activeTab, setActiveTab] = useState<'Clinic Users' | 'Platform Super Admin'>('Clinic Users');",
  stateReplacement
);

// 3. Update the list to use state instead of constants
fileContent = fileContent.replace(
  "(activeTab === 'Clinic Users' ? MOCK_PLATFORM_USERS : MOCK_SUPER_ADMINS).map",
  "(activeTab === 'Clinic Users' ? clinicUsers : superAdmins).map"
);

// 4. Update the Add User button
fileContent = fileContent.replace(
  "          <button className=\"pum-btn-primary\">\n            <UserPlus size={16} /> Add User\n          </button>",
  "          <button className=\"pum-btn-primary\" onClick={() => setShowInviteDrawer(true)}>\n            <UserPlus size={16} /> Add User\n          </button>"
);

// 5. Add the Drawer at the end
const drawerReplacement = `
      {showInviteDrawer && (
        <InviteStaffDrawer
          onClose={() => setShowInviteDrawer(false)}
          currentRole="Platform Admin"
          existingUsers={activeTab === 'Clinic Users' ? clinicUsers : superAdmins}
          onInvite={handleInviteStaff}
        />
      )}
    </div>
  );
}
`;
fileContent = fileContent.replace(
  "    </div>\n  );\n}",
  drawerReplacement
);

fs.writeFileSync('src/components/PlatformUserManagement.tsx', fileContent);
console.log('Done!');
