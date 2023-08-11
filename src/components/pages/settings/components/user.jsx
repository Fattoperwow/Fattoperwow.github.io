import { css } from "../../../../styles/system";
import { useState } from "react";

import { Select } from "../../../primitives/select/select";
import { Button } from "../../../primitives/button/button";
import { SelectOption } from "../../../primitives/select/option";
import { Avatar } from "../../../primitives/avatar/avatar";
import { GrUserSettings } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";

import {
  hairs,
  accessories,
  hairColors,
  facialHair,
  facialHairColor,
  clothes,
  clothesColor,
  eyes,
  eyebrow,
  mouth,
  skinColor,
} from "../../../../settings/avatars/settings";
import { Text } from "../../../primitives/text/text";
import { Input } from "../../../primitives/input/input";
import { Flex } from "../../../primitives/flex/flex";
import { ErrorMessage } from "../../../primitives/text/error";

export const UserSettings = ({
  user,
  avatarWidth,
  onSubmit,
  error,
  hasAdminAuth,
}) => {
  // set avatar states
  const [avatarHairs, setAvatarHairs] = useState(user?.avatar?.hair);
  const [avatarAccessories, setAvatarAccessiories] = useState(
    user?.avatar?.accessory
  );
  const [avatarHairColor, setAvatarHairColor] = useState(
    user?.avatar?.hair_color
  );
  const [avatarFacialHair, setAvatarfacialHair] = useState(
    user?.avatar?.facial_hair
  );
  const [avatarFacialHairColor, setAvatarfacialHairColor] = useState(
    user?.avatar?.facial_hair_color
  );
  const [avatarClothes, setAvatarClothes] = useState(user?.avatar?.clothes);
  const [avatarClothesColor, setAvatarClothesColor] = useState(
    user?.avatar?.clothes_color
  );
  const [avatarEyes, setAvatarEyes] = useState(user?.avatar?.eyes);
  const [avatarEyebrow, setAvatarEyebrow] = useState(user?.avatar?.eyebrow);
  const [avatarMouth, setAvatarMouth] = useState(user?.avatar?.mouth);
  const [avatarSkinColor, setAvatarSkinColor] = useState(
    user?.avatar?.skin_color
  );

  // set Settings state
  const [username, setUsername] = useState(user.username);
  const [teamName, setTeamName] = useState(user.team_name);
  const [role, setRole] = useState(user.role || "user");

  // on update
  const onUpdate = () => {
    const newData = {
      ...user,
      username: username,
      team_name: teamName,
      role: role,
      avatar: {
        hair: avatarHairs,
        accessory: avatarAccessories,
        hair_color: avatarHairColor,
        facial_hair: avatarFacialHair,
        facial_hair_color: avatarFacialHairColor,
        clothes: avatarClothes,
        clothes_color: avatarClothesColor,
        eyes: avatarEyes,
        eyebrow: avatarEyebrow,
        mouth: avatarMouth,
        skin_color: avatarSkinColor,
      },
    };
    onSubmit(newData, user.id);
  };

  return (
    <div className={userDetails()}>
      <div className={fieldSettings()}>
        <Flex>
          <Flex css={{ marginRight: "6px" }}>
            <GrUserSettings />
          </Flex>
          <Text size="large">Impostazioni</Text>
        </Flex>

        <div className={fieldSetting()}>
          <div className={fieldSettingItem()}>
            <Input
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={fieldSettingItem()}>
            <Input
              label="Nome squadra"
              placeholder="Nome della squadra"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className={fieldSettingItem()}>
            <Input label="Codice" value={user.id} isDisabled />
          </div>
          <div className={fieldSettingItem()}>
            <Select
              label="Ruolo"
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <SelectOption value="user">Utente</SelectOption>
              <SelectOption value="admin">Admin</SelectOption>
            </Select>
          </div>
        </div>
      </div>
      <div className={avatarWrapper()}>
        <Flex>
          <Flex css={{ marginRight: "6px" }}>
            <RxAvatar />
          </Flex>
          <Text size="large">Avatar</Text>
        </Flex>
        <Flex
          css={{
            marginTop: "20px",
            "@bp2max": {
              display: "block",
            },
          }}
        >
          <div>
            <div className={avatar()}>
              <Avatar
                width={avatarWidth}
                alt={user.username}
                hair={avatarHairs}
                accessory={avatarAccessories}
                hairColor={avatarHairColor}
                facialHair={avatarFacialHair}
                facialHairColor={avatarFacialHairColor}
                clothes={avatarClothes}
                clothesColor={avatarClothesColor}
                eyes={avatarEyes}
                eyebrow={avatarEyebrow}
                mouth={avatarMouth}
                skinColor={avatarSkinColor}
              />
            </div>
          </div>
          <div className={avatarSelectors()}>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Capelli"
                value={avatarHairs}
                onChange={(e) => {
                  setAvatarHairs(e.target.value);
                }}
              >
                {hairs.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Colore dei capelli"
                value={avatarHairColor}
                onChange={(e) => {
                  setAvatarHairColor(e.target.value);
                }}
              >
                {hairColors.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Barba e baffi"
                value={avatarFacialHair}
                onChange={(e) => {
                  setAvatarfacialHair(e.target.value);
                }}
              >
                {facialHair.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Colore barba e baffi"
                value={avatarFacialHairColor}
                onChange={(e) => {
                  setAvatarfacialHairColor(e.target.value);
                }}
              >
                {facialHairColor.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Occhi"
                value={avatarEyes}
                onChange={(e) => {
                  setAvatarEyes(e.target.value);
                }}
              >
                {eyes.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Sopracciglia"
                value={avatarEyebrow}
                onChange={(e) => {
                  setAvatarEyebrow(e.target.value);
                }}
              >
                {eyebrow.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Bocca"
                value={avatarMouth}
                onChange={(e) => {
                  setAvatarMouth(e.target.value);
                }}
              >
                {mouth.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Accessori"
                value={avatarAccessories}
                onChange={(e) => {
                  setAvatarAccessiories(e.target.value);
                }}
              >
                {accessories.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Vestiti"
                value={avatarClothes}
                onChange={(e) => {
                  setAvatarClothes(e.target.value);
                }}
              >
                {clothes.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Colore vestiti"
                value={avatarClothesColor}
                onChange={(e) => {
                  setAvatarClothesColor(e.target.value);
                }}
              >
                {clothesColor.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}>
              <Select
                size="full"
                label="Colore pelle"
                value={avatarSkinColor}
                onChange={(e) => {
                  setAvatarSkinColor(e.target.value);
                }}
              >
                {skinColor.map((it) => {
                  return (
                    <SelectOption key={it} value={it}>
                      {it}
                    </SelectOption>
                  );
                })}
              </Select>
            </div>
            <div className={avatarSelectorItem()}></div>
            <div className={avatarSelectorItem()}></div>
          </div>
        </Flex>
      </div>
      <div>
        {error && (
          <ErrorMessage css={{ marginTop: "15px" }}>{error}</ErrorMessage>
        )}
      </div>
      <Flex css={{ width: "100%", justifyContent: "end" }}>
        <Button color="black" onClick={onUpdate} hasSpaceTop>
          Salva
        </Button>
      </Flex>
    </div>
  );
};

const userDetails = css({
  width: "100%",
  height: "100%",
});

const avatarWrapper = css({
  marginTop: "50px",
  "@bp2max": {
    display: "block",
  },
});

const avatar = css({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  "@bp2max": {
    marginBottom: "20px",
  },
});

const avatarSelectors = css({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  height: "max-content",
  paddingLeft: "$4",
  gap: "20px",
  "@bp1max": {
    gap: "15px 0px",
    paddingLeft: 0,
  },
});

const avatarSelectorItem = css({
  flex: "30%",
  "@bp3max": {
    flex: "45%",
  },
  "@bp1max": {
    flex: "100%",
  },
});

const fieldSettings = css({
  marginTop: "20px",
});

const fieldSetting = css({
  width: "100%",
  marginTop: "20px",
  display: "flex",
  flexWrap: "wrap",
  height: "max-content",
  gap: "20px",
  "@bp1max": {
    gap: "15px 0px",
  },
});

const fieldSettingItem = css({
  flex: "30%",
  "@bp3max": {
    flex: "45%",
  },
  "@bp1max": {
    flex: "100%",
  },
});
