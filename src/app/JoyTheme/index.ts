import { extendTheme } from '@mui/joy/styles';

const joyTheme = extendTheme({
	fontFamily: {
		body: '"Poppins", sans-serif',
		display: '"Poppins", sans-serif',
	},
	colorSchemes: {
		light: {
			palette: {
				// Primary: qora (#343434) asosida
				primary: {
					50: '#f5f5f5',
					100: '#e8e8e8',
					200: '#d1d1d1',
					300: '#a8a8a8',
					400: '#6e6e6e',
					500: '#343434',
					600: '#2a2a2a',
					700: '#1a1a1a',
					800: '#121212',
					900: '#0d0d0d',
					solidBg: '#343434',
					solidColor: '#FFB300',
					solidHoverBg: '#1a1a1a',
					solidActiveBg: '#0d0d0d',
					solidDisabledBg: '#9e9e9e',
					softBg: 'rgba(52, 52, 52, 0.1)',
					softColor: '#343434',
					softHoverBg: 'rgba(52, 52, 52, 0.18)',
					softActiveBg: 'rgba(52, 52, 52, 0.28)',
					outlinedBorder: '#343434',
					outlinedColor: '#343434',
					outlinedHoverBg: 'rgba(52, 52, 52, 0.06)',
					outlinedActiveBg: 'rgba(52, 52, 52, 0.12)',
					plainColor: '#343434',
					plainHoverBg: 'rgba(52, 52, 52, 0.06)',
					plainActiveBg: 'rgba(52, 52, 52, 0.12)',
				},
				// Warning slot ni oltin rangga override qilamiz
				warning: {
					50: '#fdf8f0',
					100: '#f9edda',
					200: '#f2d8b4',
					300: '#e8c38d',
					400: '#dfba76',
					500: '#FFB300',
					600: '#B8973E',
					700: '#A07A28',
					800: '#9e7e4f',
					900: '#856640',
					solidBg: '#FFB300',
					solidColor: '#343434',
					solidHoverBg: '#B8973E',
					solidActiveBg: '#A07A28',
					softBg: 'rgba(215, 181, 134, 0.15)',
					softColor: '#7a5e2e',
					softHoverBg: 'rgba(215, 181, 134, 0.28)',
					softActiveBg: 'rgba(215, 181, 134, 0.4)',
					outlinedBorder: '#FFB300',
					outlinedColor: '#9e7e4f',
					outlinedHoverBg: 'rgba(215, 181, 134, 0.08)',
					plainColor: '#9e7e4f',
					plainHoverBg: 'rgba(215, 181, 134, 0.08)',
				},
			},
		},
	},
	components: {
		JoyButton: {
			defaultProps: {
				size: 'md',
			},
			styleOverrides: {
				root: {
					fontFamily: '"Poppins", sans-serif',
					fontWeight: 500,
					letterSpacing: '0.3px',
					borderRadius: '8px',
					transition: 'all 0.22s ease',
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
					},
				},
			},
		},
	},
});

export default joyTheme;
