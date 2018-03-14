package pl.myprojects.drawingpictures.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import pl.myprojects.drawingpictures.dao.PictureRepository;
import pl.myprojects.drawingpictures.model.Picture;

@Service
public class PictureService {

	@Autowired
	private PictureRepository pictureRepo;
	
	private static final String selectAll = "all";
	
	public List<Picture> getAllPictures() {
		return pictureRepo.findAll();
	}
	
	public Picture savePicture(Picture p) {
		return pictureRepo.save(p);
	}
	
	public void deletePicture(Picture p) {
		pictureRepo.delete(p);
	}
	
	public int getNumberOfRows() {
		return pictureRepo.countNumberOfRows();
	}
	
	public List<Picture> getPicturesInRange(int from, int to, String select) {
		if(select.equals(selectAll))
			return pictureRepo.findPicturesInRange(new Long(from), new Long(to));
		else
			return pictureRepo.findPicturesInRange(new Long(from), new Long(to), select);
	}
	
	public List<String> getAuthors() {
		return pictureRepo.findAllAuthors();
	}
	
	
}
