import { PartnerProvider } from "../Context/PartnerContext";
import { TeamProvider } from "../Context/TeamContext";
import TeamAdmin from "./TeamAdmin";
import PartnerAdmin from "./PartnerAdmin";

function AdminApp() {
  return (
    <TeamProvider>
      <PartnerProvider>
        <div>
          <TeamAdmin />
          <PartnerAdmin />
        </div>
      </PartnerProvider>
    </TeamProvider>
  );
}

export default AdminApp;
