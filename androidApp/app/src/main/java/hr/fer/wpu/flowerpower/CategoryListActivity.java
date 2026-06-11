package hr.fer.wpu.flowerpower;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class CategoryListActivity extends Activity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		//load category info
		Map<Category, List<Product>> categories = Utils.loadData();

		//scroll layout
		ScrollView scrollView = new ScrollView(this);

		//child linear layout
		LinearLayout layout = new LinearLayout(this);
		layout.setOrientation(LinearLayout.VERTICAL);
		layout.setBackgroundColor(getColor(R.color.white));

		//create and add each category
		for (Map.Entry<Category, List<Product>> entry : categories.entrySet()) {

			//load each category info
			Category cat = entry.getKey();
			String catName = cat.getName();

			//image
			ImageView logo = new ImageView(this);
			String imgName = cat.getImgName();
			Context context = logo.getContext();
			int id = context.getResources().getIdentifier(imgName, "drawable", context.getPackageName());
			logo.setImageResource(id);

			LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(400, 400);
			layoutParams.gravity= Gravity.CENTER;
			logo.setLayoutParams(layoutParams);
			layout.addView(logo);

			//button
			Button button = new Button(this);
			button.setText(catName);
			layout.addView(button);

			button.setOnClickListener(new View.OnClickListener() {
				@Override
				public void onClick(View v) {
					Intent intent = new Intent(CategoryListActivity.this, ProductListActivity.class);

					//read the name od the selected category
					String catName = (String) button.getText();

					//fetch the category obj from it's name
					Category cat = null;
					for (Category catTmp : categories.keySet()) {
						if (catName.equals(catTmp.getName())){
							cat = catTmp;
							break;
						}
					}

					//make and call intent
					intent.putExtra("catObj", cat);
					startActivity(intent);
				}
			});
		}

		//draw the layout
		scrollView.addView(layout);
		this.setContentView(scrollView);
	}
}