import { AboutMe, NavOption } from "../../generalTypes";
import { desktopSize } from "../../styles/globalStyleVariables";

export const getOptions = (
  aboutMe: AboutMe | undefined,
  slug: string | undefined,
  isAboutMe?: boolean
): Array<NavOption> => {
  let isDesktop = undefined;
  if (process.browser) isDesktop = window.innerWidth > desktopSize;
  const optionsArray: Array<NavOption> = [
    {
      isActive: slug === "" ? true : false,
      text: "Blogg",
      image: "/postIcon.svg",
      link: "/",
    },
    {
      isActive: slug === "atelje" ? true : false,
      text: "Ateljé",
      image: "/imageIcon.svg",
      link: "/atelje",
    },
  ];
  if (aboutMe)
    optionsArray.splice(2, 0, {
      isActive: isAboutMe ? true : false,
      text: "Marina Sundberg",
      image: "/personIcon.svg",
      link: `/${aboutMe.slug.current}`,
    });
  // if (isDesktop)
  //   optionsArray.push({
  //     isActive: slug === "kundvagn" ? true : false,
  //     text: "Kundvagn",
  //     image: "/shop-cart.svg",
  //     link: "/kundvagn",
  //   });

  return optionsArray;
};
