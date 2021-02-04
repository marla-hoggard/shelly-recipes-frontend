import React from 'react';

const Cheese: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 165 165" className={className}>
      <path d="M 25.065 64.372 l 76.296 11.748 c -0.594 -1.188 -0.957 -2.508 -0.957 -3.894 c 0 -4.884 3.96 -8.811 8.811 -8.811 c 4.884 0 8.811 3.96 8.811 8.811 c 0 2.376 -0.957 4.521 -2.475 6.105 l 24.882 3.828 c 2.904 0.462 4.158 -1.32 2.871 -3.927 l -11.682 -23.364 c -1.386 0.891 -3.003 1.419 -4.785 1.419 c -4.884 0 -8.811 -3.96 -8.811 -8.811 c 0 -3.795 2.409 -6.996 5.775 -8.25 l -5.742 -11.484 c -1.32 -2.607 -4.554 -3.795 -7.227 -2.673 L 98.193 30.382 c 1.683 2.31 2.706 5.148 2.706 8.25 c 0 7.755 -6.27 14.025 -14.025 14.025 c -6.93 0 -12.672 -5.016 -13.794 -11.616 L 24.702 61.501 c -2.706 1.155 -2.541 2.409 0.363 2.871 z m 37.983 -10.956 a 2.904 2.904 90 0 1 2.904 2.904 a 2.904 2.904 90 0 1 -2.904 2.904 a 2.904 2.904 90 1 1 0 -5.841 z M 31.599 84.865 c 5.61 0 10.164 4.554 10.164 10.164 c 0 5.61 -4.554 10.164 -10.164 10.164 a 10.098 10.098 90 0 1 -5.742 -1.782 l 0.99 8.712 c 0.33 2.904 2.97 5.412 5.907 5.577 l 62.37 3.696 c -0.033 -0.264 -0.066 -0.495 -0.066 -0.726 c 0 -4.818 3.927 -8.745 8.745 -8.745 c 4.818 0 8.745 3.927 8.745 8.745 a 9.108 9.108 90 0 1 -0.165 1.749 l 19.503 1.155 c 2.904 0.165 5.709 -2.013 6.27 -4.884 l 6.072 -32.439 L 21.6 66.517 l 2.508 21.681 c 1.848 -2.046 4.521 -3.3 7.491 -3.3 z m 34.716 0.231 c 3.399 0 6.138 2.739 6.138 6.138 c 0 3.399 -2.739 6.138 -6.138 6.138 c -3.399 0 -6.138 -2.739 -6.138 -6.138 c 0 -3.399 2.739 -6.138 6.138 -6.138 z m -12.276 17.193 c 1.617 0 2.904 1.287 2.904 2.904 c 0 1.617 -1.32 2.904 -2.904 2.904 a 2.904 2.904 90 0 1 -2.904 -2.904 c 0 -1.617 1.32 -2.904 2.904 -2.904 z" />
    </svg>
  );
};

export default Cheese;
