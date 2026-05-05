import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loaderAsset from '../assets/Loading circles (1).lottie';

export default function Animate() {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <DotLottieReact
                src={loaderAsset}
                style={{ width: '100%', height: '100%' }}
                loop
                autoplay
            />
        </div>
    )
}