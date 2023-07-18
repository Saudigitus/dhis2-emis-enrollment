import React from "react";
import enrollment from "../../assets/images/home/enrollment.png";
import { DashboardCard, SummaryCard, WithPadding } from "../../components";

function Cards(): React.ReactElement {
  return (
    <WithPadding>
      <DashboardCard
        icon={enrollment}
        title="Enrollment"
        value="27"
        leftLabel="Total"
        program="programId"
        formLink="#"
        listLink="#"
      />
      <br />
      <div className="d-flex">
        <SummaryCard value="2" label="Imported" color="success" />
        <SummaryCard value="1" label="Error" color="error" />
        <SummaryCard value="0" label="Ignored" color="secondary" />
      </div>
    </WithPadding>
  );
}
export default Cards;
