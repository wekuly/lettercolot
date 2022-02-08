import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';
//이미지 가져올때 이런방식도 가능

const IMAGES = {
    rock: rockImg,
    scissor: scissorImg,
    paper: paperImg,
};

function HandIcon({ value, className }) {
    const src = IMAGES[value];
    return <img className={className} src={src} alt={value} />;
    // 이미지 반환하기
}

export default HandIcon;
