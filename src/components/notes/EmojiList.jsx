export const EmojiList = ({ emojis }) => {
  return (
    <>
      {emojis.map((e) => (
        <div key={e.id}>{e.emoji}</div>
      ))}
    </>
  );
};
