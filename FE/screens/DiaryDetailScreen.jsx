import DiaryDetail from "../components/diaryDetail/DiaryDetail";

const DiaryDetailScreen = ({ route }) => {
  const { diaryId, refreshKey } = route.params;
  return <DiaryDetail diaryId={diaryId} refreshKey={refreshKey} />;
};

export default DiaryDetailScreen;
