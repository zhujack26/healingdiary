import { useState } from "react";
import AddHashtag from "./AddHashtag";
import TimerRecord from "./TimerRecord";

const MakingDiary = () => {
  const [response, setResponse] = useState(null);
  const [isCompleteButtonVisible, setIsCompleteButtonVisible] = useState(false);

  const handleResponse = (responseData) => {
    console.log(responseData);
    setResponse((prev) => responseData);
  };

  return (
    <>
      <TimerRecord
        onUploadComplete={handleResponse}
        onToggleNextButtonVisibility={setIsCompleteButtonVisible}
      />
      {response && (
        <AddHashtag
          responseData={response}
          onToggleCompleteButtonVisibility={setIsCompleteButtonVisible}
        />
      )}
    </>
  );
};

export default MakingDiary;
