import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Building2,
  Image,
  Store,
  Package,
  Tags,
  PieChart,
  BarChart3,
  Factory,
  RefreshCw,
  BoxesIcon,
  Layers,
} from "lucide-react";

// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3
    className={`text-lg font-semibold text-gray-900 dark:text-white ${className}`}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const Dashboard = () => {
  const [data, setData] = useState({
    exhibitionStats: null,
    dealerStats: null,
    distributorStats: null,
    categorySummary: null,
    productSummary: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exhibitions, dealers, distributors, categories, products] =
          await Promise.all([
            fetch("https://autofittools.com/api/exhibition/stats").then((res) =>
              res.json()
            ),
            fetch("https://autofittools.com/api/dealers/stats").then((res) =>
              res.json()
            ),
            fetch("https://autofittools.com/api/distributors/stats").then(
              (res) => res.json()
            ),
            fetch("https://autofittools.com/api/categories/summary").then(
              (res) => res.json()
            ),
            fetch("https://autofittools.com/api/product/summary").then((res) =>
              res.json()
            ),
          ]);

        setData({
          exhibitionStats: exhibitions,
          dealerStats: dealers,
          distributorStats: distributors,
          categorySummary: categories,
          productSummary: products,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span className="text-lg font-medium">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  const {
    exhibitionStats,
    dealerStats,
    distributorStats,
    categorySummary,
    productSummary,
  } = data;

  const stateComparisonData = Array.from(
    new Set([
      ...dealerStats.stateDealerStats.map((s) => s.state),
      ...distributorStats.stateDistributorStats.map((s) => s.state),
    ])
  ).map((state) => ({
    state,
    dealers:
      dealerStats.stateDealerStats.find((s) => s.state === state)?.count || 0,
    distributors:
      distributorStats.stateDistributorStats.find((s) => s.state === state)
        ?.count || 0,
  }));

  const categoryData = categorySummary.names.map((name) => ({
    name,
    count: categorySummary.count,
  }));

  const summaryCards = [
    {
      title: "Total Categories",
      value: categorySummary.count,
      icon: Tags,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Total Products",
      value: productSummary.totalProducts,
      icon: Package,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Exhibitions",
      value: exhibitionStats.totalExhibitions,
      icon: Building2,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Media Assets",
      value:
        Number(exhibitionStats.totalImages) +
        Number(exhibitionStats.totalVideos),
      subtitle: `${exhibitionStats.totalImages} Images • ${exhibitionStats.totalVideos} Videos`,
      icon: Image,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "Total Dealers",
      value: dealerStats.totalDealers,
      icon: Store,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Total Distributors",
      value: distributorStats.totalDistributors,
      icon: Factory,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const chartCards = [
    {
      title: "Category Distribution",
      icon: Layers,
      data: categoryData,
      render: (data) => (
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(107, 114, 128, 0.2)"
          />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Bar
            dataKey="count"
            fill="#6366f1"
            name="Categories"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      ),
    },
    {
      title: "Products by Category",
      icon: BoxesIcon,
      data: productSummary.productsByCategory,
      render: (data) => (
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(107, 114, 128, 0.2)"
          />
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Bar
            dataKey="total"
            fill="#3b82f6"
            name="Products"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      ),
    },
    {
      title: "State-wise Distribution",
      icon: BarChart3,
      data: stateComparisonData,
      render: (data) => (
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(107, 114, 128, 0.2)"
          />
          <XAxis
            dataKey="state"
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Bar
            dataKey="dealers"
            fill="#4f46e5"
            name="Dealers"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="distributors"
            fill="#059669"
            name="Distributors"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      ),
    },
    {
      title: "Media Distribution by Exhibition",
      icon: PieChart,
      data: exhibitionStats.titleMediaStats,
      render: (data) => (
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(107, 114, 128, 0.2)"
          />
          <XAxis
            dataKey="title"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "currentColor", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Bar
            dataKey="imageCount"
            fill="#4f46e5"
            name="Images"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="videoCount"
            fill="#059669"
            name="Videos"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-heading">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 font-heading">
              Overview of your business metrics and performance indicators
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex  items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-600 dark:text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="font-heading">Refresh Data</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryCards.map((card, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm  text-gray-500 dark:text-gray-400 font-body font-bold">
                      {card.title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white font-body">
                      {card.value.toLocaleString()}
                    </p>
                    {card.subtitle && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {card.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {chartCards.map((chart, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <chart.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <CardTitle className="font-heading font-bold">
                    {chart.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="font-body font-bold"
                  >
                    {chart.render(chart.data)}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
