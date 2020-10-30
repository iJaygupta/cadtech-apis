import Guide from '../../models/Guide';

class GuideService {

    async getAllGuide() {
        try {
            let data = await Guide.find({});
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new GuideService();
