import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		gray: {
			700: '#1f2733'
		}
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode('#FFFF')(props),
				fontFamily: "'Montserrat', sans-serif",
				
			},
			html: {
				fontFamily: "'Montserrat', sans-serif",
				overflow: "hidden"

			},
			heading:{
				fontFamily: "'Montserrat', sans-serif"
			}
		})
	}
};
