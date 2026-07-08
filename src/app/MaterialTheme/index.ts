import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';
// import { maxWidth } from '@mui/system';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		type: 'light',
		background: {
			default: '#ffffff',
			paper: common.white,
		},
		primary: {
			contrastText: '#FFB300',
			main: '#343434',
		},
		secondary: {
			contrastText: '#343434',
			main: '#FFB300',
		},
		text: {
			primary: '#343434',
			secondary: '#FFB300',
			dark: common.black,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { height: '100%', minHeight: '100%' },
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: '8px',
					fontFamily: '"Poppins", sans-serif',
					fontWeight: 500,
					textTransform: 'none' as const,
					letterSpacing: '0.5px',
					transition: 'all 0.25s ease',
				},
				containedPrimary: {
					backgroundColor: '#343434',
					color: '#FFB300',
					'&:hover': {
						backgroundColor: '#1a1a1a',
						color: '#DFC060',
						boxShadow: '0 4px 14px rgba(52, 52, 52, 0.35)',
					},
					'&:active': {
						backgroundColor: '#0d0d0d',
					},
				},
				containedSecondary: {
					backgroundColor: '#FFB300',
					color: '#343434',
					'&:hover': {
						backgroundColor: '#E6A200',
						color: '#1a1a1a',
						boxShadow: '0 4px 14px rgba(215, 181, 134, 0.45)',
					},
					'&:active': {
						backgroundColor: '#CC9000',
					},
				},
				outlinedPrimary: {
					borderColor: '#343434',
					color: '#343434',
					borderWidth: '1.5px',
					'&:hover': {
						borderColor: '#343434',
						borderWidth: '1.5px',
						backgroundColor: 'rgba(52, 52, 52, 0.06)',
					},
				},
				outlinedSecondary: {
					borderColor: '#FFB300',
					color: '#FFB300',
					borderWidth: '1.5px',
					'&:hover': {
						borderColor: '#E6A200',
						backgroundColor: 'rgba(215, 181, 134, 0.08)',
					},
				},
				textPrimary: {
					color: '#343434',
					'&:hover': {
						backgroundColor: 'rgba(52, 52, 52, 0.06)',
					},
				},
				textSecondary: {
					color: '#FFB300',
					'&:hover': {
						backgroundColor: 'rgba(215, 181, 134, 0.08)',
					},
				},
				sizeLarge: {
					padding: '12px 28px',
					fontSize: '15px',
				},
				sizeMedium: {
					padding: '9px 22px',
					fontSize: '14px',
				},
				sizeSmall: {
					padding: '6px 16px',
					fontSize: '13px',
				},
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
