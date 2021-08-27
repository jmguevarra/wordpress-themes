<?php
/**
 * Index File
 * 
 */

//Header Content
get_header();
?>


<?php if( have_posts() ): ?>
    <?php while( have_posts() ): ?>
        <?php the_post(); ?>
        <h2>
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
        </h2>
        <div>
            Posted on 
            <a href="<?php the_permalink(); ?>">
                <time datetime="<?= get_the_date('c'); ?>"><?php the_date(); ?></time>
            </a>
            By:
            <a href="<?= get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>">
                <?= get_the_author(); ?>
            </a>
        </div>
        <div><?php the_excerpt(); ?></div>
        <a href="<?php the_permalink(); ?>">Read More</a>
    <?php endwhile; ?>
<?php else: ?>
        <p>Sorry, no post matched your criteria.</p>
<?php endif; ?>


<?php 
    //Footer Content
    get_footer(); 
?>