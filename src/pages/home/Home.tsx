import React from "react";
import style from "./home.module.css";
import { DashboardCard, Title } from "../../components";
import { cardsData } from "../../utils/constants/dashboard/dashboardData";

function Home(): React.ReactElement {
  return (
    <div className={style.bodyContainer}>
      {cardsData().map((section, y) => (
        <div key={y} className={style.section}>
          <Title label={section.title}/>
          <div className={style.containerCards}>
            {section.subItem.map((data: any, i: number) => (
              <div key={i}>
                <DashboardCard
                  program={data.program}
                  icon={data.icon}
                  title={data.title}
                  listLink={"/table"}
                  formLink={"#"}
                  leftLabel={data.leftLabel}
                  value={"30"}
                />
                &nbsp;&nbsp;
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Home;
