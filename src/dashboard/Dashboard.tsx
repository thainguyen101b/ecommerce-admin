import { Card, CardContent, CardHeader } from "@mui/material";
import { Title } from "react-admin";

export const Dashboard = () => (
  <div style={{ padding: "20px" }}>
    <Title title="Dashboard" />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
      }}
    >
      <Card>
        <CardHeader title="Welcome to Ecommerce Admin" />
        <CardContent>
          <p>Manage your ecommerce catalog from here.</p>
          <ul>
            <li>Categories - Manage product categories</li>
            <li>Subcategories - Manage subcategories</li>
            <li>Products - Manage your products</li>
            <li>SKUs - Manage product variants</li>
            <li>Attributes - Manage product attributes</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Quick Actions" />
        <CardContent>
          <p>Use the navigation menu to:</p>
          <ul>
            <li>View and manage all resources</li>
            <li>Create new items using the "Create" button</li>
            <li>Edit existing items</li>
            <li>Filter and search data</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);
