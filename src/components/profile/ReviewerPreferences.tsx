import { ReviewerPreferencesContainer } from "./reviewer-preferences/ReviewerPreferencesContainer";

interface ReviewerPreferencesProps {
  userId: string;
}

export function ReviewerPreferences({ userId }: ReviewerPreferencesProps) {
  return <ReviewerPreferencesContainer userId={userId} />;
}
