import { useState } from "react";
import { Text } from "../../../primitives/text/text";
import { ErrorMessage } from "../../../primitives/text/error";

export const UploadStrategies = ({ onImport, error }) => {
  return (
    <div>
      <Text size="xlarge">Carica strategie</Text>
      <Text size="small" css={{ marginBottom: "20px" }}>
        Sono ammesse solo le strategie scaricate da fantaasta
      </Text>
      <input type="file" id="test" onChangeCa={onImport}  />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};
