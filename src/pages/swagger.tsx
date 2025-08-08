import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// Disable SSR for Swagger UI
const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

const DocsPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <SwaggerUI url="/swagger/swagger.json" />
    </div>
  );
};

export default DocsPage;
