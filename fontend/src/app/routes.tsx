import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Showroom from "./pages/Showroom";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import Account from "./pages/Account";
import Installation from "./pages/Installation";
import Warranty from "./pages/Warranty";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetail },
      { path: "categories/:slug", Component: CategoryPage },
      { path: "about", Component: About },
      { path: "solutions", Component: Solutions },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogDetail },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "pricing", Component: Pricing },
      { path: "faq", Component: FAQ },
      { path: "support", Component: Support },
      { path: "showroom", Component: Showroom },
      { path: "partners", Component: Partners },
      { path: "careers", Component: Careers },
      { path: "account", Component: Account },
      { path: "installation", Component: Installation },
      { path: "warranty", Component: Warranty },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
]);