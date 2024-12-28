import { memo, useEffect, useState } from 'react';


function NoSSR({ children }) {
    
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  if (canRender) {
    return children;
  } else {
    return null;
  }
}

export default memo(NoSSR);

