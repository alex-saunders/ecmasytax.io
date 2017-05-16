import { toggleDrawer, toggleSearch } from './utils';
import { search } from './page-list';

export const pageFetchError = (bool) => {
  return {
    type: 'PAGE_ERROR',
    payload: bool,
  };
};

export const pageIsLoading = (bool) => {
  return {
    type: 'PAGE_LOADING',
    payload: bool,
  };
};

export const setActiveRoute = (route) => {
  return {
    type: 'ACTIVE_ROUTE',
    payload: route,
  };
};

export const setActivePage = (page) => {
  document.title = `ECMASyntax - ${page.fields.name}`;
  return {
    type: 'ACTIVE_PAGE',
    payload: page,
  };
};

export const pageFetchSuccess = (page) => {
  return (dispatch) => {
    dispatch(setActivePage(page));
    dispatch(pageIsLoading(false));
  };
};

export const fetchPage = (route) => {
  return (dispatch) => {
    dispatch(setActiveRoute(route));
    dispatch(pageIsLoading(true));
    dispatch(pageFetchError(false));

    dispatch(toggleDrawer(false));
    dispatch(toggleSearch(false));
    dispatch(search(''));

    switch (true) {
      case /\/$/.test(route):
        dispatch(pageIsLoading(false));
        dispatch(pageFetchSuccess({ fields: { name: 'Home', route: '/' } }));
        break;
      case /\/pages\/(.*)/.test(route):
        setTimeout(() => {
          fetch(`/api${route}`)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response;
          })
          .then((response) => { return response.json(); })
          .then((response) => {
            dispatch(pageFetchSuccess(response));
          })
          .catch((err) => {
            dispatch(pageFetchError(true));
            throw err;
          });
        }, 0);
        break;
      default:
        throw Error(`Invalid url: ${route}`);
    }
  };
};

