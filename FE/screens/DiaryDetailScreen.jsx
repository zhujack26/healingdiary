import DiaryDetail from "../components/diaryDetail/DiaryDetail";

const DiaryDetailScreen = ({ route }) => {
  const { diaryId } = route.params;
  return <DiaryDetail diaryId={diaryId} />;
};

export default DiaryDetailScreen;
