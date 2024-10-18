import Breadcrumb from "@/components/Breadcrumb";
import ThemeButton from "@/components/Buttons/ThemeLinkButton";

export default function NotFound() {
  return (
    <>
      <Breadcrumb />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 max-lg:tw-w-full tw-min-h-[80vh] lg:tw-space-x-5 max-lg:tw-text-center">
            <p className="lg:tw-inline-block">
              The page you requested cannot be found!
            </p>
            <ThemeButton title="Return Home" href="/" />
          </div>
        </div>
      </div>
    </>
  );
}
