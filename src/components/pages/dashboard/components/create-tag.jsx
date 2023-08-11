import { SketchPicker } from "react-color";
import { Flex } from "../../../primitives/flex/flex";
import { Text } from "../../../primitives/text/text";
import { IconPicker } from "./icon-picker";
import { cloneElement, useState } from "react";
import { Input } from "../../../primitives/input/input";
import { icons } from "./icons";
import { useStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { Button } from "../../../primitives/button/button";
import { ErrorMessage } from "../../../primitives/text/error";
import uuid from "react-uuid";
import { toast } from "react-toastify";

export const CreateTagModal = ({
  setModal,
  iconValue,
  nameValue,
  bgColorValue,
  iconColorValue,
  iconId,
  isEditMode,
}) => {
  const [icon, setIcon] = useState(iconValue || "");
  const [iconColor, setIconColor] = useState(iconColorValue || "#000");
  const [bgColor, setBgColor] = useState(bgColorValue || "#fff");
  const [name, setName] = useState(nameValue || "");

  const [error, setError] = useState(false);

  const { magheggi, updateTags } = useStore(
    (state) => ({
      magheggi: state.magheggi,
      updateTags: state.updateTags,
    }),
    shallow
  );

  const onSaveTag = () => {
    // Validate
    if (!icon || !name || !iconColor || !bgColor) {
      setError("Compila tutti i campi");
      return;
    }
    setError("");

    if (isEditMode) {
      const tags = magheggi?.tags.map((tag) => {
        return tag.id === iconId
          ? {
              ...tag,
              icon: icon,
              color: iconColor,
              bg: bgColor,
              name: name,
            }
          : tag;
      });
      // Save everything to localstorage
      const newMagheggiData = {
        ...magheggi,
        tags: [...tags],
      };
      updateTags(tags);
      // Add data to localstorage
      localStorage.setItem("magheggi", JSON.stringify(newMagheggiData));

      toast.success("Tag modificato correttamente!");
    } else {
      // Create tag

      // Create data
      const newData = [
        ...magheggi?.tags,
        {
          id: uuid(),
          icon: icon,
          color: iconColor,
          bg: bgColor,
          name: name,
        },
      ];
      // Create localstorage object
      const newMagheggiData = {
        ...magheggi,
        tags: [...newData],
      };

      updateTags(newData);
      // Add data to localstorage
      localStorage.setItem("magheggi", JSON.stringify(newMagheggiData));

      // Clean fieds
      setIcon(null);
      setName("");

      toast.success("Tag creato correttamente!");
    }
  };

  return (
    <div>
      <Text size="xlarge">{isEditMode ? "Modifica Tag" : "Crea tag"}</Text>
      <Flex css={{ marginTop: "20px" }}>
        <div>
          <Input
            label="Nome"
            placeholder="Scegli nome del tag"
            value={name}
            size="large"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli icona
          </Text>
          <IconPicker value={icon} onChange={setIcon} />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli colore
          </Text>
          <SketchPicker
            color={iconColor}
            onChangeComplete={(e) => setIconColor(e.hex)}
          />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <Text size="large" css={{ marginBottom: "10px" }}>
            Scegli sfondo
          </Text>
          <SketchPicker
            color={bgColor}
            onChangeComplete={(e) => setBgColor(e.hex)}
          />
        </div>
      </Flex>
      <Flex css={{ marginTop: "40px" }}>
        <Text size="large">Anterprima:</Text>
        <Flex css={{ marginLeft: "20px" }}>
          {icon && (
            <Flex
              css={{
                backgroundColor: bgColor,
                width: "65px",
                height: "65px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "$pill",
              }}
            >
              {cloneElement(
                icons.find((loopIcons) => loopIcons.value === icon).component,
                { color: iconColor, size: 40 }
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Flex css={{ marginTop: "20px" }}>
        <Button color="black" onClick={onSaveTag}>
          {isEditMode ? "Salva" : "Crea tag"}
        </Button>
      </Flex>
    </div>
  );
};
