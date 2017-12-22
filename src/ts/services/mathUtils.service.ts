import {MathUtils} from '../utils/MathUtils';
import {IMathFunctions} from '../model/interfaces/IMathFunctions';

const mathUtils = new MathUtils();

export const mathUtilsService: IMathFunctions = mathUtils;