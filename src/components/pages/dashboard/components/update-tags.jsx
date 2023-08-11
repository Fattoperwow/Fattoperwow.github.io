import { shallow } from "zustand/shallow";
import { useStore } from "../../../../store/store";
import { css } from "../../../../styles/system";
import { Flex } from "../../../primitives/flex/flex";
import { Text } from "../../../primitives/text/text";
import { CreateTagModal } from "./create-tag";
import { icons } from "./icons";
import { useState } from "react";
import { cloneElement } from "react";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";

export const UpdateTags = ({ value, onChange }) => {
  const { magheggi, updateTags } = useStore(
    (state) => ({
      magheggi: state.magheggi,
      updateTags: state.updateTags,
    }),
    shallow
  );

  const [selectedTag, setSelectedTag] = useState(null);

  console.log({ selectedTag });

  // delete tag
  const onDeleteTag = (id, name) => {
    if (
      window.confirm(
        `Vuoi cancellare il tag ${name}? Il tag non sara' piu disponibile tra i tuoi obiettivi.`
      )
    ) {
      // update tag
      const tags = magheggi?.tags.filter((tag) => tag.id !== id);
      updateTags(tags);

      // Save everything to localstorage
      const newMagheggiData = {
        ...magheggi,
        tags: [...tags],
      };
      localStorage.setItem("magheggi", JSON.stringify(newMagheggiData));
      setSelectedTag(null);

      toast.success("Tag eliminato correttamente!");
    }
  };

  return (
    <>
      <Flex css={{ alignItems: "start", "@bp2max": { display: "block" } }}>
        <div className={boxWrapper({ size: 30 })}>
          <Text size="large" css={{ marginBottom: "20px" }}>
            Lista tags
          </Text>
          <div className={tagList()}>
            {magheggi?.tags.map((tag) => {
              return (
                <div
                  className={tagListItem({
                    isActive: tag?.id === selectedTag?.id,
                  })}
                  onClick={() => setSelectedTag(tag)}
                  key={tag.value}
                >
                  <Flex css={{ width: "100%" }}>
                    <Flex
                      css={{
                        backgroundColor: tag.bg,
                        width: "30px",
                        height: "30px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "$pill",
                        marginRight: "15px",
                      }}
                    >
                      {cloneElement(
                        icons.find((loopIcons) => loopIcons.value === tag.icon)
                          .component,
                        { color: tag.color, size: 20 }
                      )}
                    </Flex>
                    <Text size="medium">{tag.name}</Text>
                  </Flex>
                  <Flex
                    css={trashStyle}
                    onClick={() => onDeleteTag(tag.id, tag.name)}
                  >
                    <TbTrash size={20} />
                  </Flex>
                </div>
              );
            })}
          </div>
        </div>
        <div className={boxWrapper({ size: 30 })}>
          <div style={{ marginLeft: "30px" }}>
            {selectedTag && (
              <CreateTagModal
                isEditMode
                iconValue={selectedTag.icon}
                nameValue={selectedTag.name}
                bgColorValue={selectedTag.bg}
                iconColorValue={selectedTag.color}
                iconId={selectedTag.id}
                key={selectedTag.id}
              />
            )}
            {!selectedTag && magheggi?.tags.length > 0 && (
              <Text>Seleziona un tag prima di procedere.</Text>
            )}
          </div>
        </div>
      </Flex>
      {magheggi?.tags.length === 0 && (
        <Text>Crea un tag prima di procedere.</Text>
      )}
    </>
  );
};

const boxWrapper = css({
  variants: {
    size: {
      30: {
        width: "30%",
        "@bp2max": {
          width: "100%",
        },
      },
      70: {
        width: "70%",
        "@bp2max": {
          width: "100%",
        },
      },
    },
  },
});

const tagList = css({
  borderRight: "1px solid $grey6",
  overflowY: "scroll",
  padding: "0 $4 0 0",
  "@bp2max": {
    borderRight: "none",
    borderBottom: "1px solid $grey6",
    marginBottom: "20px",
    width: "100%",
  },
});

const tagListItem = css({
  height: "50px",
  backgroundColor: "$grey2",
  marginBottom: "$4",
  borderRadius: "$2",
  padding: "$1 $3 $1 $4",
  "&:hover": {
    backgroundColor: "$grey3",
    cursor: "pointer",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  },
  display: "flex",
  alignItems: "center",
  variants: {
    isActive: {
      true: {
        backgroundColor: "$grey3",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      },
    },
  },
});

const trashStyle = {
  width: "40px",
  height: "40px",
  minWidth: "40px",
  minHeight: "40px",
  justifyContent: "center",

  borderRadius: "$pill",
  "&:hover": {
    backgroundColor: "$grey4",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    "& svg": {
      color: "$red1",
    },
  },
};
