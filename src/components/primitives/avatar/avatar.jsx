import React from "react";


interface Props {
  width?: number;
  alt?: string;
  hair: string;
  hairColor: string;
  accessory: string;
  facialHair: string;
  facialHairColor: string;
  clothes: string;
  clothesColor: string;
  eyes: string;
  eyebrow: string;
  mouth: string;
  skinColor: string;
}

export const Avatar = ({
  width,
  alt,
  hair,
  hairColor,
  accessory,
  facialHair,
  facialHairColor,
  clothes,
  clothesColor,
  eyes,
  eyebrow,
  mouth,
  skinColor,
}: Props) => {
  return (
    <img
      src={`https://avataaars.io/?avatarStyle=Transparent&topType=${hair}&accessoriesType=${accessory}&hairColor=${hairColor}&facialHairType=${facialHair}&facialHairColor=${facialHairColor}&clotheType=${clothes}&clotheColor=${clothesColor}&eyeType=${eyes}&eyebrowType=${eyebrow}&mouthType=${mouth}&skinColor=${skinColor}`}
      alt={alt}
      width={width}
    />
  );
};
