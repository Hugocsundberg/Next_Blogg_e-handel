import React, { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import {
  BlurDiv,
  OptionText,
  BottomContainer,
  RightSideContainer,
  HamburgerContainer,
  ImageDiv,
  Logo,
  OptionDiv,
  Spacer,
  UnExpandArea,
} from "./elements";
import { getOptions } from "./config";
import { rem } from "../../styles/globalStyleVariables";
import { Spiral as Hamburger } from "hamburger-react";
import Link from "next/link";
import { AboutMe, Product as ProductType, NavOption } from "../../generalTypes";
import { getOptionsHeight } from "./functions";
import { useRouter } from "next/router";
import { CartIcon } from "./cartIcon";
import {
  getFromStorage,
  isReserved,
  removeProductFromStorage,
} from "../../functions";
import { desktopSize } from "../../styles/globalStyleVariables";

const CartIconRef = forwardRef(CartIcon);

const Nav = ({
  aboutMe,
  spacer = true,
}: {
  aboutMe?: AboutMe;
  spacer?: boolean;
}) => {
  const [currentPath, setcurrentPath] = useState("");
  const [componentLoaded, setcomponentLoaded] = useState(false);
  const [isDesktop, setisDesktop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cartItems, setcartItems] = useState<string | number>("-");
  const router = useRouter();
  const _route = router.route.replace("/", "");
  const isAboutMe: boolean =
    (aboutMe?.slug && router.asPath === `/${aboutMe.slug.current}`) ?? false;

  const updateCartItems = () => {
    const cart: Array<Object> | null | undefined = getFromStorage("cart");
    if (Array.isArray(cart)) {
      setcartItems((cart as Array<ProductType>).length);
    }
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.key == "Escape") setIsExpanded(false);
  };

  useEffect(() => {
    isExpanded
      ? window.addEventListener("keydown", keyDownHandler)
      : window.removeEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [isExpanded]);

  const resizeHandlerIsDesktop = (): void => {
    if (window.innerWidth > desktopSize) setisDesktop(true);
    else setisDesktop(false);
  };

  useEffect(() => {
    if (process.browser) {
      //Set path
      let path = window.location.origin;
      setcurrentPath(path);

      //Update Cart
      updateCartItems();
      window.addEventListener("updatecart", updateCartItems);

      //Check if desktop
      resizeHandlerIsDesktop();
      window.addEventListener("resize", resizeHandlerIsDesktop);

      // Remove item from cart if not resrved anymore
      const interval = setInterval(() => {
        const cart = getFromStorage("cart");
        cart.forEach((cartItem) => {
          if (!isReserved((cartItem as ProductType).lastReservedAt)) {
            removeProductFromStorage("cart", cartItem as ProductType);
          }
        });
      }, 3 * 1000);

      return () => {
        window.removeEventListener("updatecart", updateCartItems);
        window.removeEventListener("resize", resizeHandlerIsDesktop);
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <>
      <UnExpandArea
        isExpanded={isExpanded}
        onClick={() => {
          setIsExpanded(false);
        }}
      ></UnExpandArea>
      {spacer ? <Spacer /> : ""}
      <BlurDiv
        suppressHydrationWarning
        onLoad={() => {
          setcomponentLoaded(true);
        }}
        componentIsLoaded={componentLoaded}
        isExpanded={isExpanded}
        optionsHeight={isDesktop ? 0 : getOptionsHeight(aboutMe)}
      >
        {isDesktop
          ? ""
          : getOptions(aboutMe, _route, isAboutMe).map(
              (option: NavOption, key: any) => (
                <a key={key} href={`${currentPath}${option.link}`}>
                  <OptionDiv isActive={option.isActive}>
                    <ImageDiv>
                      <Image
                        src={option.image}
                        alt={option.text}
                        layout="fill"
                        objectFit="contain"
                      />
                    </ImageDiv>
                    <OptionText>{option.text}</OptionText>
                  </OptionDiv>
                </a>
              )
            )}
        <BottomContainer className="topOverlay">
          {isDesktop ? (
            ""
          ) : (
            <HamburgerContainer>
              <Hamburger
                size={rem * 1.8}
                toggled={isExpanded}
                toggle={setIsExpanded}
                easing="cubic-bezier(0.165, 0.84, 0.44, 1)"
                duration={0.6}
              />
            </HamburgerContainer>
          )}

          <Link href="/" scroll={false}>
            <Logo>Marinas Ateljé</Logo>
          </Link>
          <RightSideContainer>
            {isDesktop
              ? getOptions(aboutMe, _route, isAboutMe).map(
                  (option: NavOption, key: any) => (
                    <Link key={key} href={`${currentPath}${option.link}`}>
                      <a>
                        <OptionDiv noBorder={true} isActive={option.isActive}>
                          {option.text === "Kundvagn" ? (
                            <CartIconRef cartItems={cartItems} />
                          ) : (
                            <ImageDiv>
                              <Image
                                src={option.image}
                                alt={option.text}
                                layout="fill"
                                objectFit="contain"
                              />
                            </ImageDiv>
                          )}
                          <OptionText>{option.text}</OptionText>
                        </OptionDiv>
                      </a>
                    </Link>
                  )
                )
              : ""
                // <Link href="/kundvagn">
                //   <a>
                //     <CartIconRef cartItems={cartItems} />
                //   </a>
                // </Link>
            }
          </RightSideContainer>
        </BottomContainer>
      </BlurDiv>
    </>
  );
};

export default Nav;
