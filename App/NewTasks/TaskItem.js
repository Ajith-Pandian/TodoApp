import React from "react";
import { View, Dimensions } from "react-native";
import { TextComponent } from "../Components/TextComponents";
import { GRAY } from "../Constants";
const WIDTH = Dimensions.get("window").width;
const TaskItem = () => {
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#e3e3e3",
        justifyContent: "center",
        backgroundColor: "#efefef",
        alignItems: "center"
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <TextComponent textStyle={{ margin: 2 }}>13 OCT</TextComponent>
          <TextComponent textStyle={{ margin: 2 }}>16:25</TextComponent>
        </View>
      </View>
      <TextComponent
        textStyle={{ margin: 2, fontSize: 18, textAlign: "center" }}
      >
        Title
      </TextComponent>
      <View
        style={{
          width: "100%",
          height: 0.8,
          backgroundColor: "#bababa",
          marginTop: 20,
          marginBottom: 20
        }}
      />
      <TextComponent
        numberOfLines={7}
        textStyle={{ marginLeft: 20, marginRight: 20 }}
      >
        Lorem ipsum dolor sit amet, graeci menandri tincidunt mea te. Ocurreret
        sadipscing eos eu, sapientem definitionem te nec. Cu sit ceteros
        rationibus, ut agam soleat fabulas qui. Dico populo electram in eos.
        Wisi torquatos no est. Adhuc maiestatis mei te. Duo id adolescens
        consetetur efficiendi, ius officiis antiopam ea. Ubique nostrud
        postulant id vis, his et quem virtute rationibus. Adhuc postulant pri
        eu. Id bonorum delicatissimi vis, legere animal luptatum qui ex, in sint
        iudico vix. Augue inciderint pri an, ei sonet lobortis moderatius nec.
      </TextComponent>
      <TextComponent
        textStyle={{
          marginRight: 20,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: "flex-end"
        }}
      >
        Author
      </TextComponent>
    </View>
  );
};
export default TaskItem;
