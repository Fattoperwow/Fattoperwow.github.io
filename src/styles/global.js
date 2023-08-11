import { globalCss } from "@stitches/react";
import { colors } from "./tokens";
import { teamsSettings } from "../settings/teams/teams";

export const globalStyles = globalCss({
  ".changes-paragraph": {
    p: {
      marginBottom: "20px",
      "&:last-of-type": {
        marginBottom: "0px",
      },
    },
    ul: {
      marginBottom: "$4",
    },
    li: {
      marginLeft: "$4",
      listStyle: "disc",
    },
  },
  ".ͼ1.cm-editor.cm-focused": {
    outline: `1px solid ${colors.blue1}`,
  },

  /** For textarea with line numbers */
  ".editor": {
    counterReset: "line",

    whiteSpace: "pre",
    minWidth: "100%",
    minHeight: "65px",
    float: "left",
    "& > textarea, & > pre": {
      outline: "none",
      whiteSpace: "pre !important",
    },
  },

  ".editor #codeArea": {
    outline: "none",
    paddingLeft: "35px !important",
  },

  ".editor pre": {
    paddingLeft: "35px !important",
    position: "static !important",
  },

  ".editor .editorLineNumber": {
    position: "absolute",
    left: "0px",
    color: "#aaa",
    background: "#eee",
    textAlign: "right",
    paddingRight: "5px",
    width: "25px",
    fontWeight: "100",
    "&:last-of-type": {
      height: "100%",
    },
  },
});

export const modalCommonStyles = () => {
  return {
    backgroundColor: "$white",
    borderRadius: "$2",
    padding: "$5",
    "@bp2max": {
      width: "80vw",
    },
  };
};

export const playerColorVariants = (deg = 130) => {
  let variants = {};
  teamsSettings.forEach((team) => {
    variants[team.name.toLowerCase()] = {
      background: `linear-gradient(${deg}deg, ${team.first_color} 0%, ${team.blend_color}, 80%, ${team.second_color} 100%)`,
    };
  });

  return variants;
};

export const playerCardColorVariants = (deg = 130) => {
  let variants = {};
  teamsSettings.forEach((team) => {
    variants[team.name.toLowerCase()] = {
      background: `linear-gradient(${deg}deg, ${team.first_color_opac} 0%, ${team.blend_color_opac}, 50%, ${team.second_color_opac} 100%)`,
    };
  });

  return variants;
};

export const playerCardMainColorVariants = (deg = 130) => {
  let variants = {};
  teamsSettings.forEach((team) => {
    variants[team.name.toLowerCase()] = {
      backgroundColor: `${team.first_color}`,
    };
  });

  return variants;
};
