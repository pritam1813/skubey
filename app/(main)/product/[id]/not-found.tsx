import Breadcrumb from "@/components/Breadcrumb";
import ThemeButton from "@/components/Buttons/ThemeLinkButton";

export default function ProductNotFound() {
  <>
    {/* <Breadcrumb customTitle="Product Not Found" /> */}
    <div className="container">
      <div className="row">
        <div className="col-sm-9 max-lg:tw-w-full tw-min-h-[10vh] lg:tw-space-x-5 max-lg:tw-text-center">
          <p className="lg:tw-inline-block">The product is not found!</p>
          <ThemeButton title="Return Home" href="/" />
        </div>
      </div>
    </div>
  </>;
}
