import { FC, Key } from 'react';

import { TNote } from '../types';

type TProps = TNote & {
  onDelete: (id: Key) => () => Promise<void>;
};

export const Note: FC<TProps> = ({ id, content, onDelete }) => {
  return (
    <div className="note">
      <p className="note__content">{content}</p>
      <button className="note__delete" onClick={onDelete(id!)}>
        &#10006;
      </button>
    </div>
  );
};
