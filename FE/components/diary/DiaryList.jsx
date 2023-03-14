import { FlatList } from "react-native-gesture-handler";
import Title from "../../ui/Title";
import DiaryItem from "./DiaryItem";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    hashtags: "#해시태그 #해시태그",
    date: "2023년 3월 4일",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    hashtags: "#해시태그 ",
    date: "2023년 3월 4일",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    hashtags: "#해시태그 #해시태그 #해시태그",
    date: "2023년 3월 4일",
  },
];

const DiaryList = ({ type }) => {
  return (
    <>
      {type === "my" ? <Title>나의 일기</Title> : <Title>내 소모임 일기</Title>}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <DiaryItem hashtags={item.hashtags} date={item.date} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default DiaryList;
