import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { UserService } from '@reinsurance/helpers';
import 'react-toastify/dist/ReactToastify.css';
import { EmptyState, Grid, Icons, Theme } from '@reinsurance/ui-kit';
import App from './App';
import store from './store/store';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

UserService.initKeycloak(
  () => {
    return root.render(
      <Theme.ThemeWrapper>
        <Provider store={store}>
          <ToastContainer />
          <App />
        </Provider>
      </Theme.ThemeWrapper>,
    );
  },
  () => {
    return root.render(
      <Theme.ThemeWrapper>
        <Grid justifyContent="center" alignItems="center">
          <EmptyState
            title={'Une erreur est survenue'}
            subTitle={'Veuillez réessayer ultérieurement'}
            action={{
              label: 'Réessayer',
              startIcon: <Icons.Refresh />,
              onClick: () => window.location.reload(),
            }}
          />
        </Grid>
      </Theme.ThemeWrapper>,
    );
  },
);

reportWebVitals();
