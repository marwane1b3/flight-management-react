import { HomePage, TasksPage, ProfilePage } from "./pages";
import { withNavigationWatcher } from "./contexts/navigation";

const routes = [
  {
    path: "/home",
    element: HomePage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
