// "use client";
// import { useCategoryWiseProducts } from "@/app/hooks/CategoryWiseProducts";
// import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, {
//   ReactNode,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   Children,
//   isValidElement,
//   cloneElement,
// } from "react";
// import AnimateHeight from "react-animate-height";

// interface CategoryData {
//   data: any;
//   isLoading: boolean;
//   isError: any;
// }

// interface SubMenuDropdownButtonProps {
//   title: string;
//   children: ReactNode;
//   categories: string[];
//   hasLabel?: boolean;
//   LabelStyle?: string;
//   ContentStyle?: string;
// }

// interface ChildProps {
//   categoryData: Record<string, CategoryData>;
// }

// const SubMenuDropdownButton = ({
//   title,
//   hasLabel = false,
//   children,
//   categories,
//   LabelStyle,
//   ContentStyle,
// }: SubMenuDropdownButtonProps) => {
//   const [showSubmenu, setShowSubmenu] = useState(false);
//   const [height, setHeight] = useState<string | number>(0);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   // Create separate hooks for each category
//   const featuredData = useCategoryWiseProducts(
//     showSubmenu && categories.includes("featured") ? "featured" : null
//   );
//   const latestData = useCategoryWiseProducts(
//     showSubmenu && categories.includes("latest") ? "latest" : null
//   );
//   const bestsellerData = useCategoryWiseProducts(
//     showSubmenu && categories.includes("bestseller") ? "bestseller" : null
//   );

//   // Combine the data into a single object
//   const categoryData: Record<string, CategoryData> = {
//     featured: featuredData,
//     latest: latestData,
//     bestseller: bestsellerData,
//   };

//   const handleSubmenuShow = useCallback(() => {
//     setShowSubmenu(!showSubmenu);
//     setHeight(height === 0 ? "auto" : 0);
//   }, [showSubmenu, height]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setShowSubmenu(false);
//         setHeight(0);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Clone children and pass categoryData as props
//   const childrenWithData = Children.map(children, (child) => {
//     if (isValidElement(child)) {
//       return cloneElement(child, { categoryData } as ChildProps);
//     }
//     return child;
//   });

//   return (
//     <div>
//       <button
//         className="tw-capitalize text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
//         onClick={handleSubmenuShow}
//         ref={buttonRef}
//       >
//         {title}
//         {hasLabel && (
//           <span
//             className={`tw-absolute tw-left-2.5 -tw-top-2.5  tw-capitalize ${LabelStyle}`}
//           ></span>
//         )}
//         {showSubmenu ? (
//           <FontAwesomeIcon
//             icon={faAngleUp}
//             className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1"
//           />
//         ) : (
//           <FontAwesomeIcon
//             icon={faAngleDown}
//             className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1"
//           />
//         )}
//       </button>
//       <AnimateHeight
//         duration={500}
//         height={height as number}
//         className={`tw-block tw-absolute tw-right-auto tw-z-20 ${ContentStyle}`}
//       >
//         {showSubmenu && <div ref={dropdownRef}>{childrenWithData}</div>}
//       </AnimateHeight>
//     </div>
//   );
// };

// export default SubMenuDropdownButton;

"use client";
import { useCategoryWiseProducts } from "@/app/hooks/CategoryWiseProducts";
import {
  faAngleDown,
  faAngleUp,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import AnimateHeight from "react-animate-height";

interface CategoryData {
  data: any;
  isLoading: boolean;
  isError: any;
}

interface SubMenuDropdownButtonProps {
  title: string;
  children?: ReactNode;
  categories?: string[];
  hasLabel?: boolean;
  LabelStyle?: string;
  ContentStyle?: string;
  isMobileScreen?: boolean;
}

interface ChildProps {
  categoryData: Record<string, CategoryData>;
}

const SubMenuDropdownButton = ({
  title,
  hasLabel = false,
  children,
  categories,
  LabelStyle,
  ContentStyle,
  isMobileScreen = false,
}: SubMenuDropdownButtonProps) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [height, setHeight] = useState<string | number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const categoryData: Record<string, CategoryData> = {
    featured: useCategoryWiseProducts(
      showSubmenu && categories?.includes("featured") ? "featured" : null
    ),
    latest: useCategoryWiseProducts(
      showSubmenu && categories?.includes("latest") ? "latest" : null
    ),
    bestseller: useCategoryWiseProducts(
      showSubmenu && categories?.includes("bestseller") ? "bestseller" : null
    ),
  };

  const handleSubmenuShow = useCallback(() => {
    setShowSubmenu(!showSubmenu);
    setHeight(height === 0 ? "auto" : 0);
  }, [showSubmenu, height]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSubmenu(false);
        setHeight(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const childrenWithData = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { categoryData } as ChildProps);
    }
    return child;
  });

  const getToggleIcon = () => {
    if (isMobileScreen) {
      return (
        <FontAwesomeIcon
          icon={showSubmenu ? faMinus : faPlus}
          className="tw-text-base/4 d-inline-block"
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={showSubmenu ? faAngleUp : faAngleDown}
        className="tw-text-sm/4 tw-w-[14px] tw-h-[14px] d-inline-block tw-pl-1"
      />
    );
  };

  const renderButton = () => {
    if (isMobileScreen) {
      return (
        <Link
          href={"/"}
          passHref
          className="text-decoration-none tw-text-primary tw-flex tw-justify-between position-relative tw-text-base/5 tw-font-bold lg:tw-py-[15px] hover:tw-text-secondaryLight"
          onClick={handleSubmenuShow}
        >
          {title}
          {children && (
            <button
              ref={buttonRef}
              className={`tw-w-5 tw-h-5 ${
                showSubmenu
                  ? "tw-bg-primaryHover tw-text-primary"
                  : "tw-bg-primary tw-text-secondary"
              }`}
              onClick={handleSubmenuShow}
            >
              {getToggleIcon()}
            </button>
          )}
        </Link>
      );
    }

    return (
      <button
        className="tw-capitalize text-decoration-none tw-text-primary d-block position-relative tw-text-base/5 tw-font-bold tw-py-[15px] hover:tw-text-secondaryLight hoverUnderlineStyle"
        onClick={handleSubmenuShow}
        ref={buttonRef}
      >
        {title}
        {hasLabel && (
          <span
            className={`tw-absolute tw-left-2.5 -tw-top-2.5 tw-capitalize ${LabelStyle}`}
          />
        )}
        {getToggleIcon()}
      </button>
    );
  };

  return (
    <>
      {renderButton()}
      <AnimateHeight
        duration={500}
        height={height as number}
        className={
          !isMobileScreen
            ? `tw-block tw-absolute tw-right-auto tw-z-20 ${ContentStyle}`
            : ""
        }
      >
        {showSubmenu && <div ref={dropdownRef}>{childrenWithData}</div>}
      </AnimateHeight>
    </>
  );
};

export default SubMenuDropdownButton;
