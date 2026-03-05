import { DEFAULT_LANGUAGE, translationMessages } from "@checkTracking/helpers";
import get from "lodash/get";
import React, { Suspense } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Skeleton, Stack, Typography } from "@checkTracking/ui-kit";
import { ROUTES } from "./config/routes";
import RoleProvider from "./pages/RoleProvider";

const App: React.FC = (): JSX.Element => {
  const messages = translationMessages;
  const AppRoutes = () => useRoutes(ROUTES);
  const version = process.env.REACT_APP_VERSION;
  return (
    <div className="App">
      <IntlProvider
        locale={DEFAULT_LANGUAGE}
        messages={get(messages, DEFAULT_LANGUAGE)}
      >
        <RoleProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense
              fallback={
                <>
                  <Stack spacing={2} mt={3}>
                    <Skeleton variant="rectangular" mt={2} height={100} />
                    <Skeleton variant="rectangular" mt={2} height={100} />
                    <Skeleton variant="rectangular" mt={2} height={100} />
                  </Stack>
                </>
              }
            >
              <AppRoutes />
            </Suspense>
          </Router>
        </RoleProvider>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            backgroundColor: "#f0f0f0",
            padding: "5px",
            borderRadius: "4px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 900,
          }}
        >
          <Typography variant="button">{version}</Typography>
        </div>
      </IntlProvider>
    </div>
  );
};

export default App;
