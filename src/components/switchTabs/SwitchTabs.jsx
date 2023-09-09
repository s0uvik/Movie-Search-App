import { useState } from "react";
import "./SwitchTabs.scss";

function SwitchTabs({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 2000);

    onTabChange(tab, index);
  };

  return (
    <div className="switching_tabs">
      <div className="tab_items">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tab_item ${selectedTab === index ? "active" : ""} `}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}
        <span className="moving_bg" style={{ left }}></span>
      </div>
    </div>
  );
}

export default SwitchTabs;
