import APIError from '../../lib/APIError';
import Guide from '../../models/Guide';
const HttpStatus = require('http-status-codes');


class GuideService {

    async getAllGuide() {
        try {
            let data = await Guide.find({});
            return data;
        } catch (error) {
            throw error;
        }
    }
    async addGuide(data) {
        try {
            let guide = new Guide({
                ...data
            });
            guide = await guide.save();
            return guide;
        } catch (error) {
            throw error;
        }
    }
    async deleteGuide(id) {
        try {
            let result = await Guide.findByIdAndDelete(id);
            if (!result) {
                throw new APIError({ message: 'Guide does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
    async getSingleGuide(id) {
        try {
            let result = await Guide.findById(id);
            if (!result) {
                throw new APIError({ message: 'Guide does not exists', status: HttpStatus.UNPROCESSABLE_ENTITY });
            }
            return result;
        } catch (error) {
            throw error;
        }
    }
}

export default new GuideService();
