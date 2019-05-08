import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Spark from "@/pages/Spark.vue";
import Application from "@/pages/Application.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Kafka from "@/pages/Kafka.vue";
import Testbed from "@/pages/Testbed.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/spark",
    children: [
      {
        path: "spark",
        name: "Spark",
        component: Spark
      },
      {
        path: "app",
        name: "Application",
        component: Application
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "kafka",
        name: "Kafka",
        component: Kafka
      },
      {
        path: "testbed",
        name: "testbed",
        component: Testbed
      }
    ]
  },
  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
