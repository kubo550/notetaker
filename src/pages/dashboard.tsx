import { NextPage } from "next";

import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import BoltIcon from "@heroicons/react/24/outline/BoltIcon";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";

import ArrowDownTrayIcon from "@heroicons/react/24/outline/ArrowDownTrayIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/outline/EllipsisVerticalIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { LineChart } from "@/components/LineChart";
import { BarChart } from "@/components/BarChart";

const statsData = [
  { title: "New Users", value: "34.7k", icon: <UserGroupIcon className="w-8 h-8" />, description: "↗︎ 2300 (22%)" },
  {
    title: "Total Sales",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month"
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads"
  },
  { title: "Active Users", value: "5.6k", icon: <UsersIcon className="w-8 h-8" />, description: "↙ 300 (18%)" }
];


const Dashboard: NextPage = () => {
  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="">
          <select className="select select-bordered w-full" value={"today"}>
            <option disabled value="PLACEHOLDER">hello</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last_7_days">Last 7 days</option>
            <option value="last_30_days">Last 30 days</option>
          </select>
        </div>
        <div className="text-right ">
          <button className="btn btn-ghost btn-sm normal-case"><ArrowPathIcon className="w-4 mr-2" />Refresh Data
          </button>
          <button className="btn btn-ghost btn-sm normal-case  ml-2"><ShareIcon className="w-4 mr-2" />Share</button>

          <div className="dropdown dropdown-bottom dropdown-end  ml-2">
            <label tabIndex={0} className="btn btn-ghost btn-sm normal-case btn-square "><EllipsisVerticalIcon
              className="w-5" /></label>
            <ul tabIndex={0} className="dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52">
              <li><a><ArrowDownTrayIcon className="w-4" />Download</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 mt-8 md:grid-cols-2 grid-cols-1 gap-6">
        {
          statsData.map((props, k) => {
            return (
              <DashboardStats key={k} {...props} />
            );
          })
        }
      </div>


      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">

        <LineChart />
        <BarChart />

      </div>

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div>


    </div>
  );

};


export default Dashboard;


function DashboardStats({ title, icon, value, description }: {
  title: string,
  icon: JSX.Element,
  value: string,
  description: string,
}) {


  const getDescStyle = () => {
    if (description.includes("↗︎")) return "font-bold text-green-700";
    else if (description.includes("↙")) return "font-bold text-red-700";
    else return "";
  };

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className={`stat-figure text-primary`}>{icon}</div>
        <div className="stat-title">{title}</div>
        <div className={`stat-value text-primary`}>{value}</div>
        <div className={"stat-desc  " + getDescStyle()}>{description}</div>
      </div>
    </div>
  );
}

function AmountStats({}) {
  return (
    <div className="stats bg-base-100 shadow">
      <div className="stat">
        <div className="stat-title">Amount to be Collected</div>
        <div className="stat-value">$25,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">View Users</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Cash in hand</div>
        <div className="stat-value">$5,600</div>
        <div className="stat-actions">
          <button className="btn btn-xs">View Members</button>
        </div>
      </div>
    </div>
  );
}


function PageStats({}) {
  return (
    <div className="stats bg-base-100 shadow">

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <HeartIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Total Likes</div>
        <div className="stat-value">25.6K</div>
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure invisible md:visible">
          <BoltIcon className="w-8 h-8" />
        </div>
        <div className="stat-title">Page Views</div>
        <div className="stat-value">2.6M</div>
        <div className="stat-desc">14% more than last month</div>
      </div>
    </div>
  );
}