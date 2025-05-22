export function generateStampsLayout(containerWidth: number, containerHeight: number, totalStamps: number, gap = 10) {
  let best = {
    stampSize: 0,
    columns: 1,
    rows: totalStamps,
  };

  for (let cols = 1; cols <= totalStamps; cols++) {
    const rows = Math.ceil(totalStamps / cols);

    const totalGapX = (cols - 1) * gap;
    const totalGapY = (rows - 1) * gap;

    const availableWidth = containerWidth - totalGapX;
    const availableHeight = containerHeight - totalGapY;

    const stampSizeX = availableWidth / cols;
    const stampSizeY = availableHeight / rows;

    const size = Math.floor(Math.min(stampSizeX, stampSizeY));

    if (size > best.stampSize) {
      best = { stampSize: size, columns: cols, rows };
    }
  }

  return best;
}
